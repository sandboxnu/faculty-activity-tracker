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
      className={`flex h-[170px] max-w-[219px] cursor-pointer rounded-[11px] bg-gray-100 shadow-[1px_1px_2px_#00000040]`}
      onClick={() => router.push(`/merit/professors/${professor?.id}`)}
    >
      <div className="relative left-[22px] top-[18px] h-[134px] w-[307px]">
        <div className="relative left-0 top-[4px] w-[182px] text-heading-3 ">
          {professor.lastName}, {professor.firstName}
        </div>
        <CommentBubble
          className="!absolute !left-[180px] !top-0"
          text={score?.comment}
        />
        <div className="absolute left-[2px] top-[55px] h-[80px] w-[175px]">
          <div className="absolute left-0 top-0 flex w-[175px] items-center justify-between">
            <div className="relative inline-flex flex-[0_0_auto] items-start gap-[22px]">
              <div className="relative inline-flex flex-[0_0_auto] flex-col items-start gap-[8px]">
                <div className="relative inline-flex flex-[0_0_auto] items-end gap-[19px]">
                  <div className="relative h-[15px] w-[45px] whitespace-nowrap text-label">
                    Service
                  </div>
                  <div className="relative mt-[-1.00px] h-[16px] w-[9px] whitespace-nowrap text-body">
                    {score?.serviceScore}
                  </div>
                </div>
                <div className="relative inline-flex flex-[0_0_auto] items-end gap-[10px]">
                  <div className="relative h-[15px] w-[54px] whitespace-nowrap text-label">
                    Teaching
                  </div>
                  <div className="relative mt-[-1.00px] h-[16px] w-[9px] whitespace-nowrap text-body">
                    {score?.teachingScore}
                  </div>
                </div>
                <div className="relative inline-flex flex-[0_0_auto] items-center gap-[13px]">
                  <div className="relative h-[15px] w-[51px] whitespace-nowrap text-label">
                    Research
                  </div>
                  <div className="relative mt-[-1.00px] h-[18px] w-[9px] whitespace-nowrap text-body">
                    {score?.researchScore}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-shrink-0 flex-col items-center">
              <div className="relative h-[70px] w-[60px] rounded-[30px/35px] bg-gray-100">
                <div className="absolute left-0 top-0 h-[60px] w-[60px] rounded-[30px] bg-white shadow-[0px_2px_2px_#d9d9d9]" />
                <div className="absolute left-[13px] top-[15px]  whitespace-nowrap text-[25px] font-semibold leading-[normal] tracking-[0] text-black">
                  {score?.totalScore
                    ? score.totalScore === 10
                      ? '10'
                      : score.totalScore.toFixed(1)
                    : '– –'}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[113px] top-[66px] w-[62px] text-center text-[12px] font-light leading-[normal] tracking-[0] text-black [font-family:'Lato-Light',Helvetica]">
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
