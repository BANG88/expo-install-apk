import * as React from 'react';

import { ExpoInstallApkViewProps } from './ExpoInstallApk.types';

export default function ExpoInstallApkView(props: ExpoInstallApkViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
