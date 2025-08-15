import useSWR from "swr";
import { apiHelpers } from "@/lib/configs/api";

interface GitHubStarsResponse {
  stargazers_count: number;
}

async function fetchGithubStars(
  owner: string,
  repo: string
): Promise<GitHubStarsResponse> {
  const response = await fetch(apiHelpers.buildGithubUrl(owner, repo));
  if (!response.ok) {
    throw new Error("Failed to fetch stargazers count");
  }
  return response.json();
}

export function useGithubStars(owner: string, repo: string) {
  const { data, isLoading, error } = useSWR([owner, repo], ([owner, repo]) =>
    fetchGithubStars(owner, repo)
  );

  return {
    stargazersCount: data?.stargazers_count ?? 0,
    isLoading,
    error: error as Error | null,
  };
}
