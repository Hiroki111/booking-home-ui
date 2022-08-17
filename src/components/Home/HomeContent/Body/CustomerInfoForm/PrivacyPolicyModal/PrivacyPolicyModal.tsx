import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

import { PrivacyPolicyContent } from './PrivacyPolicyContent';
import { useStyles } from './useStyles';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, handleClose }: Props) {
  const classes = useStyles();

  return (
    <Modal className={classes.root} open={isOpen} onClose={handleClose} closeAfterTransition>
      <Fade in={isOpen}>
        <div>
          <PrivacyPolicyContent handleClose={handleClose} />
        </div>
      </Fade>
    </Modal>
  );
}
