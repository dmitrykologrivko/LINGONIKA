type CardsListProps = {
  className?: string;
  invalidationKey?: string;
  languageFrom?: string;
  languageTo?: string;
  groupId?: number;
};

function CardsList({ className, invalidationKey }: CardsListProps) {
  return (
    <div className={className}></div>
  );
}

export default CardsList;
