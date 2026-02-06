import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export  function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes]);
}
