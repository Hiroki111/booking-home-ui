import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import PeopleIcon from '@material-ui/icons/People';
import clsx from 'clsx';
import { useState } from 'react';

import { StaffDto, NoPreferenceStaff } from '../../../../../../interfaces/staff';
import { useStyles } from './useStyles';
import { NO_PREFERENCE_STAFF } from '../../../../../../staticData/staff';

export interface Props {
  staff: StaffDto | NoPreferenceStaff;
  handleOnClick: () => void;
}

export function StaffPanel({ staff, handleOnClick }: Props) {
  const classes = useStyles();
  const [isImageInvalid, setIsImageInvalid] = useState(false);

  function displayPhoto(staff: StaffDto) {
    return (
      <img
        data-testid="staff-photo"
        className={clsx(classes.avatar, classes.image)}
        alt="_"
        src={staff.profilePhotoUrl}
        onError={(e) => setIsImageInvalid(true)}
      />
    );
  }

  function displayAvatar(staff: StaffDto) {
    if (staff.id === NO_PREFERENCE_STAFF.id) {
      return (
        <Avatar data-testid="no-preference-staff-avatar" className={classes.avatar}>
          <PeopleIcon />
        </Avatar>
      );
    }

    const nameArray = staff.name.trim().split(' ');
    let initials: string;
    if (nameArray.length === 0) {
      initials = '';
    } else if (nameArray.length === 1) {
      initials = nameArray[0].charAt(0).toUpperCase();
    } else {
      const firstChar = nameArray[0].charAt(0).toUpperCase();
      const lastChar = nameArray[nameArray.length - 1].charAt(0).toUpperCase();
      initials = `${firstChar}${lastChar}`;
    }

    return (
      <Avatar data-testid="staff-avatar" className={clsx(classes.avatar, classes.initials)}>
        {initials}
      </Avatar>
    );
  }

  return (
    <Paper key={staff.id} elevation={2} square onClick={handleOnClick} className={classes.root}>
      <div className={classes.staff}>
        <div>
          {!!staff.profilePhotoUrl && !isImageInvalid
            ? displayPhoto(staff as StaffDto)
            : displayAvatar(staff as StaffDto)}
        </div>
        <div className={classes.staffNameAndServices}>
          <div>
            <p className={classes.staffName}>{staff.name}</p>
            {staff?.title && <p className={classes.staffTitle}>{staff.title}</p>}
          </div>
          <div className={classes.arrow}>{'>'}</div>
        </div>
      </div>
    </Paper>
  );
}
