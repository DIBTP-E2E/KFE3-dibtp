import SignupLink from './SignupLink';

const SignupInfo = () => {
  return (
    <div className="text-sm text-text-info text-center mt-8">
      계정이 없으신가요?
      <SignupLink />
    </div>
  );
};

export default SignupInfo;
