import { Button, HStack, Input } from "@chakra-ui/react";
import { FC, useState } from "react";

export const RepoInput: FC<{
  onSubmit: ({ owner, repo }: { owner: string; repo: string }) => void;
  isError: boolean;
}> = ({ onSubmit, isError }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.length || !input.includes("/")) return;
    const [owner, repo] = input.split("/");
    if (!owner.length || !repo.length) return;
    onSubmit({ owner, repo });
    setInput("");
  };
  return (
    <HStack maxW={{ base: undefined, md: "80%", lg: "50%" }} w="100%">
      <Input
        size="lg"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
            handleSubmit();
          }
        }}
        value={input}
        borderColor={isError ? "red.400" : undefined}
        placeholder="owner/repo"
        flexGrow={1}
      />
      <Button onClick={handleSubmit} size="lg">
        Add
      </Button>
    </HStack>
  );
};
