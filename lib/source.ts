import { docs, meta } from '@/.source';

import { IconContainer } from '@/components/icon-container';
import { createElement } from 'react';
import { createMDXSource } from 'fumadocs-mdx';
import { icons } from 'lucide-react';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/',
  source: createMDXSource(docs, meta),
  icon: icon => {
    if (icon && icon in icons)
      return createElement(IconContainer, {
        icon: icons[icon as keyof typeof icons],
      });
  },
});
