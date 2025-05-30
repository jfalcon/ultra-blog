'use client';

import { ComponentType, useEffect, useState } from 'react';
import { GET as getBlog } from '@/app/api/blog/route';
import type { BlogPayload } from '@/app/api/blog/route';
import type { RestResponse } from '@/types';
import { HttpStatusCode } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withBlog(Component: ComponentType<any>) {
  // in the real world you'd also need to invalidate any SSG cache
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const WrappedComponent = (props: any) => {
    const [blog, setBlog] = useState<BlogPayload>({
      article: '',
      date: new Date(),
      title: '',
    });

    useEffect(() => {
      (async () => {
        // intentionally skip the extra network hop
        const response = await getBlog();

        if (response.status === HttpStatusCode.Ok) {
          const data = await response.json() as RestResponse<BlogPayload>;

          if (data.success && data.payload) {
            // we have to reconvert the date since it's a string now
            const date = new Date(data.payload.date);
            setBlog({...data.payload, date});
          }
        }
      })();
    }, []);

    return <Component {...props} blog={blog} />;
  };

  // useful for debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WrappedComponent.displayName = `${withBlog.name}(${displayName})`;

  return WrappedComponent;
}
