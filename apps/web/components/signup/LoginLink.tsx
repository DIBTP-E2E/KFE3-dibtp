import { PAGE_ROUTES } from '@/constants/routes';

const LoginLink = () => {
  return (
    <a href={PAGE_ROUTES.AUTH.LOGIN} className="text-orange-400 ml-1 hover:underline">
      로그인
    </a>
  );
};

export default LoginLink;
