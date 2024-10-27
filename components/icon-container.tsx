import { FileQuestion, LucideIcon } from 'lucide-react';

import { HTMLAttributes } from 'react';

export function IconContainer({
  icon: Icon,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  icon?: LucideIcon;
}): React.ReactElement {
  return (
    <div {...props} className='-mr-0.5'>
      {Icon ? <Icon /> : <FileQuestion />}
    </div>
  );
}
