import { render } from '@testing-library/react';
import { AppSharing } from '..';

describe('AppSharing', () => {
  test('renders default component successfully', () => {
    const { baseElement } = render(<AppSharing />);

    expect(baseElement.querySelector('.MuiAlert-message')).toBeTruthy();
  });
});
