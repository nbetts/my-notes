import HelpModal from 'components/Modals/HelpModal';
import { Button } from 'grommet';
import React, { useState } from 'react';

const SidebarFooter = () => {
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  return (
    <>
      <Button margin="small" label="Help" onClick={() => setHelpModalOpen(true)} />
      {helpModalOpen && <HelpModal onClose={() => setHelpModalOpen(false)} />}
    </>
  );
};

export default SidebarFooter;

