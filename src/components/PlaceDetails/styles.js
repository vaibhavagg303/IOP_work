import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  chip: {
    margin: '5px 5px 5px 0',
  },
  subtitle: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
  },
  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  success: {
    backgroundColor: '#4BB543',
    color: 'white',
  },
  error: {
    backgroundColor: '#D8000C',
    color: 'white',
  },
  warning: {
    backgroundColor: '#9F6000',
    color: 'white',
  }

}));