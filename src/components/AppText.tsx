import React from 'react';
import { Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';
import { typography, FONTS } from '../styles/typography';

export interface AppTextProps extends RNTextProps {
  variant?: keyof typeof typography;
  fontSize?: number;
  fontWeight?: '300' | '400' | '500' | '600' | '700';
  color?: string;
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  fontSize,
  fontWeight,
  color,
  style,
  children,
  ...props
}) => {
  const baseStyle = typography[variant];
  
  const customStyle: TextStyle = {
    ...baseStyle,
    ...(fontSize && { fontSize }),
    ...(fontWeight && { fontWeight }),
    ...(color && { color }),
  };

  const finalStyle = Array.isArray(style) 
    ? [customStyle, ...style] 
    : [customStyle, style];

  return (
    <RNText style={finalStyle} {...props}>
      {children}
    </RNText>
  );
};

// Export a default Text component that always uses Ubuntu font
export const Text: React.FC<RNTextProps> = ({ style, ...props }) => {
  const ubuntuStyle: TextStyle = {
    fontFamily: FONTS.primary,
  };

  const finalStyle = Array.isArray(style) 
    ? [ubuntuStyle, ...style] 
    : [ubuntuStyle, style];

  return <RNText style={finalStyle} {...props} />;
};

export default AppText;
