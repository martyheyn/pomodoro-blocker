// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';

// import FAQ from './FAQ';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// const Navbar = () => {
//   const classes = useStyles();

//   return (
//     <React.Fragment>
//       <AppBar position='static'>
//         <Toolbar>
//           <IconButton
//             edge='start'
//             className={classes.menuButton}
//             color='inherit'
//             aria-label='menu'
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant='h6' className={classes.title}>
//             Pomodoro Website Blocker
//           </Typography>
//           {/* <Button color='inherit'>FAQ</Button> */}
//           <FAQ />
//         </Toolbar>
//       </AppBar>
//     </React.Fragment>
//   );
// };

// export default Navbar;

import React from 'react';
import FAQ from './FAQ';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <div className='nav-item'>
            <a href='/#'>SiteBlocker</a>
          </div>
          <div className='nav-item'>
            <FAQ />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
