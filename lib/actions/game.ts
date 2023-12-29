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

export async function addTeam({
  playerNames,
  teamName,
}: {
  playerNames: string[];
  teamName: "A" | "B";
}) {
  try {
    // Find existing players
    const existingPlayers = await Promise.all(
      playerNames.map((name) => prisma.player.findMany({ where: { name } }))
    );

    // Flatten the array of arrays to get a single array of players
    const players = existingPlayers.flat();

    const existingTeam = await prisma.fortuneTeam.findFirst({
      where: {
        team: teamName,
      },
    });

    let team;
    if (existingTeam) {
      team = await prisma.fortuneTeam.update({
        where: {
          id: existingTeam.id,
        },
        data: {
          players: {
            connect: players.map((player) => ({ id: player.id })),
          },
          score: 0, // initialize score
        },
      });
    } else {
      team = await prisma.fortuneTeam.create({
        data: {
          players: {
            connect: players.map((player) => ({ id: player.id })),
          },
          score: 0, // initialize score
          team: teamName,
        },
      });
    }

    return team;
  } catch (error: any) {
    throw new Error(`Error adding Teams: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function addFeudTeam({
  playerNames,
  teamName,
}: {
  playerNames: string[];
  teamName: "A" | "B";
}) {
  try {
    // Find existing players
    const existingPlayers = await Promise.all(
      playerNames.map((name) => prisma.player.findMany({ where: { name } }))
    );

    // Flatten the array of arrays to get a single array of players
    const players = existingPlayers.flat();

    const existingTeam = await prisma.feudTeam.findFirst({
      where: {
        team: teamName,
      },
    });

    let team;
    if (existingTeam) {
      team = await prisma.feudTeam.update({
        where: {
          id: existingTeam.id,
        },
        data: {
          players: {
            connect: players.map((player) => ({ id: player.id })),
          },
          score: 0, // initialize score
        },
      });
    } else {
      team = await prisma.feudTeam.create({
        data: {
          players: {
            connect: players.map((player) => ({ id: player.id })),
          },
          score: 0, // initialize score
          team: teamName,
        },
      });
    }

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

export async function addFortuneRound({
  question,
  answer,
  price,
}: {
  question: string;
  answer: string;
  price: number;
}) {
  try {
    const round = await prisma.fortuneRound.create({
      data: {
        question,
        answer,
        price,
      },
    });

    console.log(round);

    return round;
  } catch (error: any) {
    throw new Error(`Error adding round: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function addFeudRound({
  question,
  answersArr: answer,
  scoresArr: answerPts,
}: {
  question: string;
  scoresArr: number[];
  answersArr: string[];
}) {
  try {
    const round = await prisma.feudRound.create({
      data: {
        question,
        answer,
        answerPts,
      },
    });

    return round;
  } catch (error: any) {
    throw new Error(`Error adding round: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function addFeudBonusRound({
  question,
  answer,
  score,
  doubled = false,
}: {
  question: string;
  score: number;
  answer: string;
  doubled?: boolean;
}) {
  try {
    const round = await prisma.feudBonusRound.create({
      data: { question, answer, price: score, doubled },
    });

    return round;
  } catch (error: any) {
    throw new Error(`Error adding bonus feud round: ${error.message}`);
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

export async function updateFortuneTeamScore({
  teamName,
  points,
}: {
  teamName: string;
  points: number;
}) {
  try {
    const existingTeam = await prisma.fortuneTeam.findFirst({
      where: {
        team: teamName,
      },
    });

    const team = await prisma.fortuneTeam.update({
      where: {
        id: existingTeam?.id,
      },
      data: {
        score: (existingTeam?.score || 0) + points,
      },
    });

    return team;
  } catch (error: any) {
    throw new Error(`Error updating team score: ${error.message}`);
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

export async function fetchFortuneRounds() {
  try {
    const rounds = await prisma.fortuneRound.findMany({});

    return rounds;
  } catch (error: any) {
    throw new Error(`Error fetching rounds ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchFeudRounds() {
  try {
    const rounds = await prisma.feudRound.findMany({});

    return rounds;
  } catch (error: any) {
    throw new Error(`Error fetching rounds ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchBonusRounds() {
  try {
    const bonusRounds = await prisma.feudBonusRound.findMany({
      include: { player: true },
    });

    return bonusRounds;
  } catch (error: any) {
    throw new Error(`Error fetching bonusRounds ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchFortuneTeams() {
  try {
    const teams = await prisma.fortuneTeam.findMany({
      include: { players: true },
    });

    return teams;
  } catch (error: any) {
    throw new Error(`Error fetching teams ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchFeudTeams() {
  try {
    const teams = await prisma.feudTeam.findMany({
      include: { players: true },
    });

    return teams;
  } catch (error: any) {
    throw new Error(`Error fetching teams ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchSingleFortuneRoundId({ id }: { id: string }) {
  try {
    const round = await prisma.fortuneRound.findFirst({ where: { id } });

    return round;
  } catch (error: any) {
    throw new Error(`Error fetching round ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function fetchSingleFeudRoundId({ id }: { id: string }) {
  try {
    const round = await prisma.feudRound.findFirst({ where: { id } });

    return round;
  } catch (error: any) {
    throw new Error(`Error fetching round ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateWinFeud({
  id,
  winner,
  price,
}: {
  id: string;
  winner: string;
  price: number;
}) {
  try {
    const round = await prisma.feudRound.update({
      where: { id },
      data: { winner, price },
    });

    const existingTeam = await prisma.feudTeam.findFirst({
      where: {
        team: winner,
      },
    });

    const team = await prisma.feudTeam.update({
      where: {
        id: existingTeam?.id,
      },
      data: {
        score: (existingTeam?.score || 0) + price,
      },
    });

    return { round, team };
  } catch (error: any) {
    throw new Error(`Error updating round ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateResetFeudTeam() {
  try {
    const existingTeams = await prisma.feudTeam.findMany();

    const updatedTeams = [];

    for (const existingTeam of existingTeams) {
      const team = await prisma.feudTeam.update({
        where: {
          id: existingTeam.id,
        },
        data: {
          score: 0,
        },
      });

      updatedTeams.push(team);
    }

    return updatedTeams;
  } catch (error: any) {
    throw new Error(`Error updating teams ${error.message}`);
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
