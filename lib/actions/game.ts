"use server";

import prisma from "@/lib/prisma";

export async function addPlayerDefault() {
  try {
    await createOrUpdatePlayer("Kielo", 0);
    await createOrUpdatePlayer("Perry", 0);
    await createOrUpdatePlayer("Allen", 0);
    await createOrUpdatePlayer("Leanne", 0);
    await createOrUpdatePlayer("Klark", 0);
    await createOrUpdatePlayer("Ashton", 0);

    return true;
  } catch (error: any) {
    throw new Error(`Error adding player: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function addTeam({ playerNames }: { playerNames: string[] }) {
  try {
    const fortuneTeam = await prisma.fortuneTeam.create({
      data: { score: 0 },
    });

    // Find existing players
    const existingPlayers = await Promise.all(
      playerNames.map((name) => prisma.player.findMany({ where: { name } }))
    );

    // Flatten the array of arrays to get a single array of players
    const players = existingPlayers.flat();

    const team = await prisma.fortuneTeam.create({
      data: {
        players: {
          connect: players.map((player) => ({ id: player.id })),
        },
        score: 0, // initialize score
      },
    });
    console.log(team);

    return team;
  } catch (error: any) {
    throw new Error(`Error adding Teams: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

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
    },
  });
}
