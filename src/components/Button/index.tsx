import { Button as GrommetButton, ButtonType } from 'grommet';
import { colors } from 'utils/theme';
import React from 'react';
import { RotateSpinner } from 'react-spinners-kit';

const ButtonLoadingIndicator = () => <RotateSpinner size={24} color={colors.brand} />;

interface ButtonProps extends ButtonType {
  loading?: boolean;
}

const Button = ({ loading, label, disabled, ...props }: ButtonProps) => (
  <GrommetButton label={loading ? <ButtonLoadingIndicator /> : label} disabled={disabled || loading} {...props} />
);

export default Button;
