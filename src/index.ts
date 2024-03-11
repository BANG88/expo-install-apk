import ExpoInstallApkModule from "./ExpoInstallApkModule";

export function install(filePath: string, fileProviderAuthority: string): void {
  try {
    if (!filePath) throw new Error("filePath is required");
    if (!fileProviderAuthority)
      throw new Error("fileProviderAuthority is required");
    ExpoInstallApkModule.install(filePath, fileProviderAuthority);
  } catch (error) {}
}
