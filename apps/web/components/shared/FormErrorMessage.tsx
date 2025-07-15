interface Props {
  message: string;
}

const FormErrorMessage = ({ message }: Props) => {
  return <p className="w-full text-center text-sm text-red-500 mt-2">{message}</p>;
};

export default FormErrorMessage;
