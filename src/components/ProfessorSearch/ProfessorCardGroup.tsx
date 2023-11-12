import { Tuple } from '@/shared/utils/professorScore.util';
import ProfessorCard from './ProfessorCard';
import exp from 'constants';

interface ProfessorCardGroupProps {
  title?: string;
  profData: Tuple[];
}

const ProfessorCardGroup: React.FC<ProfessorCardGroupProps> = ({
  title,
  profData,
}) => {
  return (
    <div className="flex flex-col pl-[28px] ">
      <div className="flex flex-row items-center justify-between pb-5 ">
        <h2
          className="text-[#585858] text-[24px] font-bold pr-[10px]"
          style={{ lineHeight: '29px' }}
        >
          {title}
        </h2>
        <div className="flex-grow h-[1px] bg-[#D9D9D9]"></div>
      </div>
      <div className="flex flex-row flex-wrap ">
        {profData.map((prof) => (
          <div key={prof[0]?.id} className="mb-8 mr-[40px]">
            <ProfessorCard professor={prof[0]} score={prof[1]} info={prof[2]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorCardGroup;
