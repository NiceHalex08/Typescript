import { Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

function setToken(userToken: any) {
  sessionStorage.setItem('user', JSON.stringify(userToken));
}

function getToken(): any | undefined {
  const tokenString = sessionStorage.getItem('user');
  const userToken = JSON.parse(tokenString || '{}');
  return userToken;
}

const Nav = () => {
  let token = getToken();
  console.log(token.username);
  let navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.clear();
    token = null;
    navigate('/');
  };

  return (
    <Box>
      <Box className='header'>
        <Box
          sx={{
            float: 'right',
            color: '#373d20',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            margin: 3,
            position: 'relative',
          }}
        >
          <AccountCircleIcon
            sx={{ paddingTop: '6px', marginRight: '6px', fontSize: '30px' }}
          />
          {token.username}
          <ExitToAppIcon
            sx={{
              paddingTop: '6px',
              marginLeft: '16px',
              fontSize: '30px',
              cursor: 'pointer',
            }}
            onClick={handleClick}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Nav;
