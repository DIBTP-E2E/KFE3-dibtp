interface Props {
  pending?: boolean;
}

const SignupButton = ({ pending }: Props) => {
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full mt-6 bg-orange-400 text-white font-semibold rounded-full py-3 text-center"
    >
      {pending ? '회원가입 중...' : '회원가입'}
    </button>
  );
};

export default SignupButton;
