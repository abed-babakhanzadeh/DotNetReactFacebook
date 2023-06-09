﻿using AutoMapper;
using Domain;
using MediatR;
using Persistant.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                if (activity != null)
                {
                    //activity.Title = request.Activity.Title ?? activity.Title;
                    _mapper.Map(request.Activity, activity);
                    await _context.SaveChangesAsync();
                }

                return Unit.Value;
            }
        }

    }
}
