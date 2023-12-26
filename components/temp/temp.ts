"use server";

import prisma from "@/lib/prisma";

export async function addPlayer({ name }: { name: string }) {
  try {
    const player = await createOrUpdatePlayer(name, [100]);

    return player;
  } catch (error: any) {
    throw new Error(`Error adding player: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchPlayers() {
  try {
    const players = await prisma.player.findMany({});

    return players;
  } catch (error: any) {
    throw new Error(`Error fetching players ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

async function createOrUpdatePlayer(name: string, points: number[]) {
  // Try to find the player
  const player = await prisma.player.findFirst({
    where: {
      name: name,
    },
  });

  // If the player doesn't exist, create a new one
  if (!player) {
    return await prisma.player.create({
      data: {
        name: name,
        points: points,
      },
    });
  }

  // If the player exists, update their points
  return await prisma.player.update({
    where: {
      id: player.id,
    },
    data: {
      points: points,
    },
  });
}
