import { useRouter } from "next/router";

export default function MagicHatRoom() {
  const router = useRouter();
  const { roomCode } = router.query;
  return <div>Test {roomCode}</div>;
}
