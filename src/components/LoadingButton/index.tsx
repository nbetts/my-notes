import { Button, ButtonType } from 'grommet';
import { colors } from 'utils/theme';
import React from 'react';
import { RotateSpinner } from 'react-spinners-kit';

const LoadingButtonLoadingIndicator = () => <RotateSpinner size={24} color={colors.brand} />;

interface ButtonProps extends ButtonType {
  loading?: boolean;
}

const LoadingButton = ({ loading, label, disabled, ...props }: ButtonProps) => (
  <Button label={loading ? <LoadingButtonLoadingIndicator /> : label} disabled={disabled || loading} {...props} />
);

export default LoadingButton;
