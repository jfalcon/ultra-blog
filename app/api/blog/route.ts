import type { RestResponse } from '@/types';
import { HttpStatusCode } from '@/types';

export interface BlogPayload {
  article: string;
  date: Date;
  title: string;
}

export async function GET() {
  const response: RestResponse<BlogPayload> = {
    success: false,
  };

  try {
    // let's pretend this came from a headless CMS
    const payload: BlogPayload = {
      article: '',
      date: new Date(),
      title: 'Several AI agent updates.',
    };

    // fake a heredoc without needing a trim
    // cspell:disable
    payload.article = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam odio mi, \
vestibulum ut nibh vitae, ultricies laoreet orci. Donec ac metus ullamcorper, sollicitudin lacus \
quis, laoreet odio. Nam pharetra et neque vitae dapibus. Nulla tempor imperdiet purus tincidunt \
laoreet. Sed sed est ac risus ultrices pellentesque. Maecenas molestie sapien diam, nec auctor \
nisi posuere ac. Aenean sodales augue sed tortor semper, quis luctus eros malesuada. Fusce sit \
amet vehicula tortor. Curabitur ut eleifend ligula, et vestibulum nulla. Sed finibus, sem eu \
mattis faucibus, felis est semper orci, at feugiat mauris lectus venenatis nulla. Donec ut \
facilisis nulla. Integer sed rhoncus justo, ac euismod nunc.';
    // cspell:enable

    // assume the headless CMS provides basic markup
    payload.article += `<br><br>${payload.article}<br><br>${payload.article}`;

    // set these last to avoid try short circuiting
    response.payload = payload;
    response.success = true;

    return new Response(JSON.stringify(response), {
      status: HttpStatusCode.Ok,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // never send this to the user in production, simply
    // loging it to STDERR on the server for the demo
    console.error(error); // eslint-disable-line no-console

    // reset payload to avoid confusion
    response.payload = undefined;

    // in real life the error code wouldn't be the same as the
    // HTTP codes, but we're just having fun here for the demo
    response.error = {
      code: HttpStatusCode.Unauthorized,
      message: HttpStatusCode[HttpStatusCode.Unauthorized]
    };

    return new Response(JSON.stringify(response), {
      status: HttpStatusCode.Unauthorized,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
