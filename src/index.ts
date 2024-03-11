import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoInstallApk.web.ts
// and on native platforms to ExpoInstallApk.ts
import ExpoInstallApkModule from './ExpoInstallApkModule';
import ExpoInstallApkView from './ExpoInstallApkView';
import { ChangeEventPayload, ExpoInstallApkViewProps } from './ExpoInstallApk.types';

// Get the native constant value.
export const PI = ExpoInstallApkModule.PI;

export function hello(): string {
  return ExpoInstallApkModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoInstallApkModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoInstallApkModule ?? NativeModulesProxy.ExpoInstallApk);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoInstallApkView, ExpoInstallApkViewProps, ChangeEventPayload };
