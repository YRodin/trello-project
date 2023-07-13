const Card = require("../models/card");
const List = require("../models/list");
const Board = require("../models/board");

exports.addCard = function (req, res, next) {
  const { name, description, tempId, listId, boardId } = req.body;
  const id = req.body.listId;
  List.findById(id)
  .then((result) => {
    const card = new Card({
      name: name,
      description: description,
      archived: false,
      label: 'none',
      list: result._id,
      board: result.board
    });

    // need to write in an a query Card.findOne() that gets the Card from the DB 
    //with the highest index from the list that the new card is being added to
    card.save();
    result.cards.push(card);
    result.save();
    res.status(200).send({card, tempId, listId, boardId});
  })
  .catch((err) => {
    console.log(err);
    res.json(err)
  })
}


exports.moveCard = async function(req, res, next) {
  // ---  req.body.sourceList/targetList looks like this:[{cardId, index}, {cardId, index}]
  const { cardId, sourceListId, targetListId, sourceList, targetList } = req.body;

  if (!targetListId || !targetList) {
    const sourceListResult = await List.findById(sourceListId);
    console.log('sourceListResult before moving WITHIN list: ', sourceListResult);

    //clear old list.cards data from source and target
    sourceListResult.cards.splice(0,sourceListResult.cards.length);

    //add the new list of cards in
    sourceListResult.cards = sourceList;  
    console.log('sourceListResult after moving WITHIN list: ', sourceListResult)
    await sourceListResult.save();
    res.send({sourceListResult})
  }
  const sourceListResult = await List.findById(sourceListId);
  const targetListResult = await List.findById(targetListId);
  const movedCard = await Card.findById(cardId);
  console.log('req.body: ', req.body);
  console.log('sourceListResult before moving: ', sourceListResult);
  console.log('targetListResult before moving: ', targetListResult);

  //clear old list.cards data from source and target
  sourceListResult.cards.splice(0,sourceListResult.cards.length);
  targetListResult.cards.splice(0,targetListResult.cards.length);

  //add the new list of cards in
  sourceListResult.cards = sourceList;
  targetListResult.cards = targetList;
  //set the listId on the Card doc to the target list
  movedCard.list  = targetListId;
  await movedCard.save();
  await sourceListResult.save()
  await targetListResult.save();
  console.log('sourceListResult after moving: ', sourceListResult);
  console.log('targetListResult after moving: ', targetListResult);

res.send({movedCard, sourceListResult, targetListResult})
}

exports.removeCard = async function(req, res, next) {
  const { cardId } = req.body;

  const removedCard = await Card.findById(cardId);
  const list = await List.findById(removedCard.list);
  removedCard.archived = true;
  const cardIndex = list.cards.indexOf(cardId);
  list.cards.splice(cardIndex, 1)

  res.status(200).send({ removedCard, list }) 
}