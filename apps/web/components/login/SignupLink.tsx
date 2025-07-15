import { PAGE_ROUTES } from '@/constants/routes';

const SignupLink = () => {
  return (
    <a href={PAGE_ROUTES.AUTH.SIGNUP} className="text-orange-400 ml-1 hover:underline">
      회원 가입
    </a>
  );
};

export default SignupLink;
