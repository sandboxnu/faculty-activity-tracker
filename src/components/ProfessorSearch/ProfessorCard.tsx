import { ProfessorInfoDto } from '@/models/professorInfo.model';
import { ProfessScoreDto } from '@/models/professorScore.model';
import { UserDto } from '@/models/user.model';
import CommentBubble from './CommentBubble';
import { useRouter } from 'next/router';
import Button from '@/shared/components/Button';

interface ProfessorCardProps {
  professor?: UserDto;
  score?: ProfessScoreDto;
  info?: ProfessorInfoDto;
}
//     onClick={() => router.push(`/merit/professors/${professor?.id}`)}

const ProfessorCard: React.FC<ProfessorCardProps> = ({
  professor,
  score,
  info,
}) => {
  const router = useRouter();
  return professor ? (
    <div
      className={`flex max-w-[219px] h-[170px] bg-gray-100 rounded-[11px] shadow-[1px_1px_2px_#00000040] cursor-pointer`}
      onClick={() => router.push(`/merit/professors/${professor?.id}`)}
    >
      <div className="relative w-[307px] h-[134px] top-[18px] left-[22px]">
        <div className="relative w-[182px] top-[4px] left-0 text-heading-3 ">
          {professor.lastName}, {professor.firstName}
        </div>
        <CommentBubble
          className="!absolute !left-[180px] !top-0"
          text={score?.comment}
        />
        <div className="absolute w-[175px] h-[80px] top-[55px] left-[2px]">
          <div className="flex w-[175px] items-center justify-between absolute top-0 left-0">
            <div className="inline-flex items-start gap-[22px] relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
                <div className="inline-flex items-end gap-[19px] relative flex-[0_0_auto]">
                  <div className="relative w-[45px] h-[15px] text-label whitespace-nowrap">
                    Service
                  </div>
                  <div className="relative w-[9px] h-[16px] mt-[-1.00px] text-body whitespace-nowrap">
                    {score?.serviceScore}
                  </div>
                </div>
                <div className="inline-flex items-end gap-[10px] relative flex-[0_0_auto]">
                  <div className="relative w-[54px] h-[15px] text-label whitespace-nowrap">
                    Teaching
                  </div>
                  <div className="relative w-[9px] h-[16px] mt-[-1.00px] text-body whitespace-nowrap">
                    {score?.teachingScore}
                  </div>
                </div>
                <div className="inline-flex items-center gap-[13px] relative flex-[0_0_auto]">
                  <div className="relative w-[51px] h-[15px] text-label whitespace-nowrap">
                    Research
                  </div>
                  <div className="relative w-[9px] h-[18px] mt-[-1.00px] text-body whitespace-nowrap">
                    {score?.researchScore}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="relative w-[60px] h-[70px] bg-gray-100 rounded-[30px/35px]">
                <div className="absolute w-[60px] h-[60px] top-0 left-0 bg-white rounded-[30px] shadow-[0px_2px_2px_#d9d9d9]" />
                <div className="absolute top-[15px] left-[13px]  font-semibold text-black text-[25px] tracking-[0] leading-[normal] whitespace-nowrap">
                  {score?.totalScore
                    ? score.totalScore === 10
                      ? '10'
                      : score.totalScore.toFixed(1)
                    : '– –'}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-[62px] top-[66px] left-[113px] [font-family:'Lato-Light',Helvetica] font-light text-black text-[12px] text-center tracking-[0] leading-[normal]">
            {!!info?.position.toLowerCase().includes('tenure')
              ? 'Tenure'
              : 'Non-Tenure'}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ProfessorCard;
