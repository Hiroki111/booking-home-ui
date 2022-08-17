import Button from '@material-ui/core/Button';

import { useStyles } from './useStyles';

interface Props {
  handleClose: () => void;
}

export function PrivacyPolicyContent({ handleClose }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>Privacy Policy</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a congue mauris. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Mauris porttitor, purus non elementum vulputate,
        risus turpis ornare odio, vitae iaculis ex nisl congue nibh. Aenean est mauris, tincidunt in ligula non,
        sagittis pulvinar neque. Donec ultricies quam ante, in ullamcorper metus gravida vitae. Ut sodales velit nec
        neque viverra, eget fermentum libero blandit. Fusce vel est a enim pulvinar tincidunt. In euismod consectetur
        erat. Suspendisse mattis felis dapibus, sodales purus aliquam, tincidunt lacus. Sed maximus odio massa, ac
        facilisis ligula suscipit sit amet.
      </p>
      <p>
        Vestibulum eleifend et nunc ut feugiat. Mauris suscipit sagittis nunc nec ornare. Suspendisse interdum justo
        tortor, quis tempor diam ornare eu. Duis quis metus vehicula, eleifend diam non, vestibulum magna. Phasellus
        lectus massa, convallis vitae vehicula pulvinar, posuere vitae ligula. Suspendisse bibendum mollis ultrices. In
        hac habitasse platea dictumst. Integer finibus mi et mi rutrum facilisis.
      </p>
      <p>
        Donec nibh velit, euismod ut ornare quis, convallis sagittis est. Maecenas in felis at libero iaculis
        consectetur eget quis metus. In eget sapien malesuada, aliquam lectus vitae, imperdiet felis. Aenean ultricies
        ipsum a sem laoreet scelerisque. Vivamus tempus in neque et bibendum. Nullam nec varius tortor. Nunc eleifend
        egestas eros, sit amet aliquam nisi dapibus in. Mauris commodo urna vel semper pharetra. Mauris at gravida odio.
        Morbi non placerat magna. Sed non urna ut justo tempus tincidunt ut ut diam.
      </p>
      <h2>Website terms</h2>
      <p>
        Cras et risus ac nisl pharetra fermentum. Fusce eget vehicula eros. Suspendisse semper auctor urna, eget
        consequat lectus pharetra id. In blandit quam sed viverra facilisis. Nullam tempor tincidunt lorem, eget posuere
        dui placerat id. Phasellus sollicitudin nisi non justo volutpat pretium. Phasellus dapibus feugiat accumsan. Nam
        a ante sit amet ipsum imperdiet eleifend nec sed orci. Nunc placerat, nulla eget mollis molestie, orci quam
        venenatis nisi, vel congue sapien nunc sit amet dolor. Duis volutpat tellus vitae sollicitudin rutrum. Curabitur
        tincidunt ullamcorper est maximus tincidunt. Vivamus sed eros bibendum, eleifend purus a, posuere ante. Vivamus
        luctus sit amet odio sit amet pellentesque. Aenean vel lacinia ligula. Vestibulum placerat tellus leo, vitae
        tincidunt ante varius ut. Maecenas eu tincidunt erat.
      </p>
      <h2>Booking Terms</h2>
      <p>
        Duis ultricies, eros ac elementum convallis, est risus finibus enim, feugiat tempor lectus lectus eget erat.
        Aenean sagittis lacus augue, vel feugiat purus vestibulum sit amet. Nunc vehicula convallis lectus, semper
        rutrum ante porttitor consectetur. Etiam posuere porta tincidunt. Duis justo nibh, pretium eu felis sed, commodo
        molestie dui. Fusce bibendum velit massa, in consequat lorem pulvinar ullamcorper. Donec ac aliquam felis.
        Aenean non odio non sem fermentum aliquam eget id sapien. Quisque dui dui, commodo eget ex at, euismod convallis
        ipsum. Nullam ligula turpis, egestas at ultrices vel, porta sed nisl. Morbi fermentum nisl id nisi iaculis, in
        tempor lacus accumsan.
      </p>
      <div className={classes.modalButtonWrapper}>
        <Button variant="contained" color="primary" onClick={handleClose}>
          CLOSE
        </Button>
      </div>
    </div>
  );
}
