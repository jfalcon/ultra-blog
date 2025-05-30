'use server';

import { GET as getBlog } from '@/app/api/blog/route';
import type { BlogPayload } from '@/app/api/blog/route';
import type { RestResponse } from '@/types';
import { HttpStatusCode } from '@/types';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default async function Home() {
  let blog: BlogPayload = {
    article: '',
    date: new Date(),
    title: '',
  };

  // this server-side so no need for useMemo here
  // can also pull this client-side via the HOC
  const response = await getBlog();

  if (response.status === HttpStatusCode.Ok) {
    const data = await response.json() as RestResponse<BlogPayload>;

    if (data.success && data.payload)
      blog = data.payload;
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      <Header />
      {/* it's not that dangerous if you trust the source */}
      <p className="flex-1 p-4" dangerouslySetInnerHTML={{ __html: blog?.article }}></p>
      <Footer />
    </main>
  );
}
