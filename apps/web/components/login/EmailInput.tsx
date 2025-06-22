const EmailInput = () => {
  return (
    <input
      type="email"
      name="email"
      placeholder="이메일을 입력해주세요."
      className="w-full px-4 py-3 rounded-full border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
      required
    />
  );
};

export default EmailInput;
