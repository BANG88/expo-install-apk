package expo.modules.installapk

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.util.Log
import androidx.core.content.FileProvider
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.io.File

class ExpoInstallApkModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoInstallApk')` in JavaScript.
    Name("ExpoInstallApk")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("install") {
      filePath: String,fileProviderAuthority: String ->
      val file = File(filePath)
      if (!file.exists()) {
        Log.e("expo-install-apk", "installApk: file does not exist '$filePath'")
        // FIXME this should take a promise and fail it
        return@Function
      }

      if (Build.VERSION.SDK_INT >= 24) {
        // API24 and up has a package installer that can handle FileProvider content:// URIs
        val contentUri: Uri
        try {
          contentUri = FileProvider.getUriForFile(appContext.reactContext?.applicationContext!!, fileProviderAuthority, file)
        } catch (e: Exception) {
          // FIXME should be a Promise.reject really
          Log.e("expo-install-apk", "installApk exception with authority name '$fileProviderAuthority'", e)
          throw e
        }
        val installApp = Intent(Intent.ACTION_INSTALL_PACKAGE)
        installApp.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        installApp.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        installApp.data = contentUri
        installApp.putExtra(Intent.EXTRA_INSTALLER_PACKAGE_NAME, appContext.reactContext?.applicationInfo?.packageName)
        appContext.reactContext?.startActivity(installApp)
      } else {
        // Old APIs do not handle content:// URIs, so use an old file:// style
        val cmd = "chmod 777 $file"
        try {
          Runtime.getRuntime().exec(cmd)
        } catch (e: Exception) {
          e.printStackTrace()
        }
        val intent = Intent(Intent.ACTION_VIEW)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        intent.setDataAndType(Uri.parse("file://$file"), "application/vnd.android.package-archive")
        appContext.reactContext?.startActivity(intent)
      }
    }
  }
}
