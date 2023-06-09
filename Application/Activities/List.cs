﻿using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistant.Interface;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>
        {

        }


        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly IDataContext _context;

            public Handler(IDataContext context)
            {
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}
