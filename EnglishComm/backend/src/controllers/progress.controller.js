export const getProgress = async (req, res) => {
  const [rows] = await db.query(
    `
    SELECT type, topic_id,
           COUNT(*) AS attempts,
           MAX(score) AS best_score
    FROM practice_results
    WHERE user_id = ?
    GROUP BY type, topic_id
    `,
    [req.user.id]
  );

  res.json(rows);
};
