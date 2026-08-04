import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { TeamMember } from "@/data/team";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="card team-card" id={member.href.split("#")[1]}>
      <div className="team-card__avatar">
        <Image
          src="/brand/logo-symbol.webp?v=3"
          alt=""
          width={112}
          height={112}
          sizes="112px"
          unoptimized
        />
      </div>
      <div>
        <p className="tag">{member.area}</p>
        <h3>{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
        <p>{member.summary}</p>
        <Link className="text-link" href={member.href}>
          Perfil institucional <Icon name="ArrowRight" />
        </Link>
      </div>
    </article>
  );
}
