// error 객체를 받아서 에러 메시지를 출력하는 함수

export default function handleFetchError(
  errorMessage: string,
  error?: unknown,
) {
  alert(
    `${errorMessage}\n${error ? "자세한 내용은 콘솔을 확인해주세요." : ""}`,
  );

  if (!error) return;
  {
    console.error(errorMessage, error);
  }
}
