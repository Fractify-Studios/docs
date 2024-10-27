import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { Step, Steps } from 'fumadocs-ui/components/steps';

import { FileTextIcon } from '@radix-ui/react-icons';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import { Metadata, Viewport } from 'next';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const updated = new Date(page.data.updated);
  const updatedHuman = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(updated);

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        single: false,
        style: 'clerk',
        header: (
          <div className='mb-6 flex flex-col gap-4'>
            <div className='flex flex-col gap-3'>
              <div className='-ms-0.5 flex items-center gap-1.5'>
                <FileTextIcon className='size-4 text-muted-foreground' />
                <p className='text-sm text-muted-foreground'>Page details</p>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='-ms-0.5 flex items-center gap-1.5'>
                  <p className='text-sm text-muted-foreground'>Last updated:</p>
                  <p className='text-sm'>{updatedHuman}</p>
                </div>
                <div className='-ms-0.5 flex items-center gap-1.5'>
                  <p className='text-sm text-muted-foreground'>Written by:</p>
                  <div className='flex flex-wrap gap-2 text-sm'>
                    {page.data.authors.map(author => (
                      <a
                        href={`https://github.com/${author}`}
                        key={author}
                        className='-ms-0.5 flex items-center gap-1.5 text-sm underline-offset-2 hover:underline'
                      >
                        <img
                          src={`https://github.com/${author}.png`}
                          alt={author}
                          className='h-4 w-4 rounded-full border border-border'
                        />
                        <span>{author}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
      }}
    >
      <div className='lg:hidden'>
        <div className='mb-6 flex flex-col gap-4'>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-1.5'>
              <FileTextIcon className='size-4 text-muted-foreground' />
              <p className='text-sm text-muted-foreground'>Page details</p>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-1.5'>
                <p className='text-sm text-muted-foreground'>Last updated:</p>
                <p className='text-sm'>{updatedHuman}</p>
              </div>
              <div className='flex items-center gap-1.5'>
                <p className='text-sm text-muted-foreground'>Written by:</p>
                <div className='flex flex-wrap gap-2 text-sm'>
                  {page.data.authors.map(author => (
                    <a
                      href={`https://github.com/${author}`}
                      key={author}
                      className='flex items-center gap-1.5 text-sm underline-offset-2 hover:underline'
                    >
                      <img
                        src={`https://github.com/${author}.png`}
                        alt={author}
                        className='h-4 w-4 rounded-full border border-border'
                      />
                      <span>{author}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DocsTitle className='text-4xl'>{page.data.title}</DocsTitle>
      <DocsDescription className='-mt-3'>
        {page.data.description}
      </DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            Accordion,
            Accordions,
            Steps,
            Step,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: `Fractify — ${page.data.title}`,
    description: page.data.description,
    openGraph: {
      type: 'website',
      siteName: 'Fractify',
      url: `https://fractify.pl`,
      title: `Fractify Docs — ${page.data.title}`,
      description: page.data.description,
      images: [
        {
          url: 'https://fractify.pl/og-image.png',
          width: 1920,
          height: 1080,
        },
      ],
    },
  } satisfies Metadata;
}

export const viewport: Viewport = {
  themeColor: '#DA133D',
};
