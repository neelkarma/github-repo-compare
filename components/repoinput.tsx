import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { FC, useContext, useState } from "react";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { OctokitContext } from "./octokitcontext";

export const RepoInput: FC<{
  onSubmit: (res: RestEndpointMethodTypes["repos"]["get"]["response"]) => void;
}> = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(false);
  const toast = useToast();
  const octokit = useContext(OctokitContext);

  const handleSubmit = async () => {
    if (!input.length || !input.includes("/")) return;
    const [owner, repo] = input.split("/");
    if (!owner.length || !repo.length) return;
    setInput("");
    setDisabled(true);
    try {
      const res = await octokit.rest.repos.get({ owner, repo });
      onSubmit(res);
    } catch {
      toast({
        title: "Invalid Repo",
        status: "error",
        position: "top-start",
        duration: 3000,
        isClosable: true,
      });
    }
    setDisabled(false);
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
        placeholder="owner/repo"
        disabled={disabled}
      />
      <Button onClick={handleSubmit} disabled={disabled} size="lg">
        Add
      </Button>
    </HStack>
  );
};
