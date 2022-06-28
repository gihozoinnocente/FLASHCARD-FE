import React, { FC } from 'react';
import { Button } from '@mui/material';
import {Buttonprops} from'../types/Props'

const Buttons:FC<Buttonprops>= ({value, ...props} ) => <Button type='submit' variant="contained" {...props}>{value}</Button>;

export default Buttons;