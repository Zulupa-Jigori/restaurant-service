#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { InfrastructureStack } from '../lib/infrastructure.stack';

const app = new cdk.App();
new InfrastructureStack(app, 'InfrastructureStack', {
  env: { account: '951556652541', region: 'eu-central-1' },
  synthesizer: new cdk.DefaultStackSynthesizer({
    qualifier: 'hnb659fds',
  }),
});
