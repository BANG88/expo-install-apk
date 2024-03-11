import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoInstallApkViewProps } from './ExpoInstallApk.types';

const NativeView: React.ComponentType<ExpoInstallApkViewProps> =
  requireNativeViewManager('ExpoInstallApk');

export default function ExpoInstallApkView(props: ExpoInstallApkViewProps) {
  return <NativeView {...props} />;
}
