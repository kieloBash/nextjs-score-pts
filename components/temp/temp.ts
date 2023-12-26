"use server";

import prisma from "@/lib/prisma";

export async function addPlayer({
  name,
  points,
}: {
  name: string;
  points: number;
}) {
  try {
    const player = await createOrUpdatePlayer(name, points);

    return player;
  } catch (error: any) {
    throw new Error(`Error adding player: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateScore({
  id,
  points,
}: {
  id: string;
  points: number;
}) {
  try {
    const player = await prisma.player.update({
      where: {
        id,
      },
      data: {
        score: points,
      },
    });

    return player;
  } catch (error: any) {
    throw new Error(`Error updating player score: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}
export async function addScore({ id, points }: { id: string; points: number }) {
  try {
    const player = await prisma.player.findFirst({
      where: {
        id,
      },
    });

    if (!player) throw new Error(`Error updating player score`);

    await prisma.player.update({
      where: {
        id,
      },
      data: {
        score: player.score + points,
        gamesPlayed: player.gamesPlayed + 1,
      },
    });

    return player;
  } catch (error: any) {
    throw new Error(`Error updating player score: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchPlayers() {
  try {
    const players = await prisma.player.findMany({
      orderBy: {
        score: "desc",
      },
    });

    return players;
  } catch (error: any) {
    throw new Error(`Error fetching players ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

async function createOrUpdatePlayer(name: string, points: number) {
  // Try to find the player
  const player = await prisma.player.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  // If the player doesn't exist, create a new one
  if (!player) {
    return await prisma.player.create({
      data: {
        name: name,
        score: points,
        gamesPlayed: 1,
      },
    });
  }

  // If the player exists, update their points
  return await prisma.player.update({
    where: {
      id: player.id,
    },
    data: {
      score: player.score + points,
      gamesPlayed: player.gamesPlayed + 1,
    },
  });
}
