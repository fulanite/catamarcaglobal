import { Icon } from "@/components/Icon";

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="state-message state-message--error" role="alert">
      <Icon name="CircleAlert" />
      {message}
    </div>
  );
}
