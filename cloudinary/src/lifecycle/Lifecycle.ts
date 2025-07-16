import {
  Lifecycle as AppLifecycle,
  AuthorizationGrantResult,
  LifecycleResult,
  LifecycleSettingsResult,
  logger,
  Request,
  storage,
  SubmittedFormData,
  jobs,
  functions
} from '@zaiusinc/app-sdk';

export class Lifecycle extends AppLifecycle {
  public async onInstall(): Promise<LifecycleResult> {
    try {
      logger.info('Performing Install');
      // TODO: any operation you need to perform during installation


      return { success: true };
    } catch (error: any) {
      logger.error('Error during installation:', error);
      return {
        success: false,
        retryable: true,
        message: `Error during installation: ${error}`,
      };
    }
  }

  public async onSettingsForm(
    section: string,
    _action: string,
    formData: SubmittedFormData
  ): Promise<LifecycleSettingsResult> {
    const result = new LifecycleSettingsResult();
    try {
      // TODO: any logic you need to perform when a setup form section is submitted
      // When you are finished, save the form data to the settings store

      logger.debug(`section: ${section}, action: ${_action}, formData : ${JSON.stringify(formData)}`);

      if (section === 'authorisation') {

        switch (_action) {
        case 'save':
          await storage.settings.put(section, formData);
          await registerWebhooks(formData.url as string,
                                 formData.username as string,
                                 formData.password as string);

          break;
        case 'sync':
          logger.info('Starting Job');
          await jobs.trigger('historical_import', {}); // <-- starting a Job
          result.addToast('info', 'Sync Started');
          break;
        }
      }

      return result;

    } catch {
      return result.addToast(
        'danger',
        'Sorry, an unexpected error occurred. Please try again in a moment.'
      );
    }
  }

  public async onAuthorizationRequest(
    _section: string,
    _formData: SubmittedFormData
  ): Promise<LifecycleSettingsResult> {
    const result = new LifecycleSettingsResult();
    // TODO: if your application supports the OAuth flow (via oauth_button in the settings form), evaluate the form
    // data and determine where to send the user: `result.redirect('https://<external oauth endpoint>')`
    return result.addToast('danger', 'Sorry, OAuth is not supported.');
  }

  public async onAuthorizationGrant(
    _request: Request
  ): Promise<AuthorizationGrantResult> {
    // TODO: if your application supports the OAuth flow, evaluate the inbound request and perform any necessary action
    // to retrieve the access token, then forward the user to the next relevant settings form section:
    // `new AuthorizationGrantResult('my_next_section')`
    return new AuthorizationGrantResult('').addToast(
      'danger',
      'Sorry, OAuth is not supported.'
    );
  }

  public async onUpgrade(_fromVersion: string): Promise<LifecycleResult> {
    // TODO: any logic required when upgrading from a previous version of the app
    // Note: `fromVersion` may not be the most recent version or could be a beta version
    return { success: true };
  }

  public async onFinalizeUpgrade(
    _fromVersion: string
  ): Promise<LifecycleResult> {
    // TODO: any logic required when finalizing an upgrade from a previous version
    // At this point, new webhook URLs have been created for any new functions in this version
    return { success: true };
  }

  public async onAfterUpgrade(): Promise<LifecycleResult> {
    // TODO: any logic required after the upgrade has been completed.  This is the plugin point
    // for triggering one-time jobs against the upgraded installation
    return { success: true };
  }

  public async onUninstall(): Promise<LifecycleResult> {
    // TODO: any logic required to properly uninstall the app
    return { success: true };
  }
}


async function registerWebhooks(instanceUrl: string, username: string, password: string): Promise<void> {
  const endpoints = await functions.getEndpoints();

  const requests: Array<Promise<Response>> = [];

  Object.entries(endpoints).forEach(([key, value]) => {
    logger.info(`Function Endpoint: ${key} - ${value}`);

    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    const url = `${instanceUrl}/triggers`;

    logger.info(`Url: ${url}`);
    logger.info(`Credentials: ${credentials}`);

    const r = fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        uri: value,
        event_type: 'upload'
      }),
      headers: {
        'Authorization': `Basic ${credentials}`,
        'content-type': 'application/json'
      },
    });
    requests.push(r);
  });

  await Promise.all(requests);
}
