import { memo } from 'react';
import { SameTabLink, NewTabLink, Img } from './styles';

export interface LinkButtonProps {
  title?: string;
  route: string;
  disabled?: boolean;
  newTab?: boolean;
  image?: string;
  description?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  iconComponent?: JSX.Element;
}

export const LinkButton = memo((props: LinkButtonProps) => {
  const { title, route, newTab, image, description, iconComponent } = props;
  if (newTab === true) {
    return (
      <NewTabLink
        href={route}
        target='_blank'
        rel='noopener noreferrer'
        title={description}
        style={{
          width: props.width,
          height: props.height,
          marginTop: props.marginTop,
          marginRight: props.marginRight,
          marginBottom: props.marginBottom,
          marginLeft: props.marginLeft,
        }}
      >
        {title}
        {iconComponent}
        {image && <Img src={image} alt={description} />}
      </NewTabLink>
    );
  }
  return (
    <div title={description}>
      <SameTabLink
        to={route}
        style={{
          width: props.width,
          height: props.height,
          marginTop: props.marginTop,
          marginRight: props.marginRight,
          marginBottom: props.marginBottom,
          marginLeft: props.marginLeft,
        }}
      >
        {title}
        {iconComponent}
        {image && <Img src={image} alt={description} />}
      </SameTabLink>
    </div>
  );
});
