async function transformGroup(group) {
  return {
    id: group.id,
    name: group.name,
    fromLanguage: group.fromLanguage,
    toLanguage: group.toLanguage,
    user: group.user,
    countLearnedWords: await Card.count({group: group.id, isLearned: true}),
    countWords: await Card.count({group: group.id})
  }
}

module.exports = {

  transformList: async (groups) => {
    const transformed = [];
    for (let group of groups) {
      transformed.push(await transformGroup(group))
    }
    return transformed;
  },

  transformOne: async (group) => {
    return await transformGroup(group);
  }

};
