interface Props {
  pending?: boolean;
}

const LoginButton = ({ pending }: Props) => {
  return (
    <button
      type="submit"
      className="w-full mt-6 bg-bg-primary text-text-inverse font-style-large rounded-full py-3 text-center"
      disabled={pending}
    >
      {pending ? '로그인 중...' : '로그인'}
    </button>
  );
};

export default LoginButton;
