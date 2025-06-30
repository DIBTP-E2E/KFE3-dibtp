interface Props {
  message: string;
}

export default function FormErrorMessage({ message }: Props) {
  return <p className="w-full text-center text-sm text-red-500 mt-2">{message}</p>;
}
